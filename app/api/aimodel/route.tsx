import { NextRequest, NextResponse } from 'next/server';
import { currentUser, auth } from '@clerk/nextjs/server';
import { openai } from '@/lib/openai';
import { aj } from '@/lib/arcjet';

const PROMPT = `
You are an AI trip-planning assistant. Your job is to guide the user by asking ONE travel-related question at a time. Follow the required question order:

1. Starting location
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Affordable, Average, Luxury)
5. Trip duration (number of days)


Rules:
- Never ask more than one question per message.
- If the user's answer is unclear or incomplete, ask for clarification.
- Stay conversational, friendly, and helpful.
- Only ask the next question after the previous one is answered.

UI Trigger Rules:
You may return a UI identifier when the next question should be answered using a UI component.
Valid UI keys:
- "groupSize"
- "budget"
- "TripDuration"
- "final" (when all info is collected and you generate the trip plan)
- null (for standard text responses)

Your response MUST always be valid JSON using this structure:

{
  "resp": "Text response to display to the user",
  "ui": "groupSize" | "budget" | "TripDuration" | "final"
}

DO NOT return anything else outside this JSON.
DO NOT explain the JSON.
`;

const FINAL_PROMPT = `Generate Travel Plan with given details, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url,Geo Coordinates, Place address, ticket Pricing, Time travel each of the location, with each day plan with best time to visit in JSON format.
 Output Schema:
 {
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}`;

export async function POST(req: NextRequest) {
  const { messages, isFinal } = await req.json();
  const user = await currentUser();
  const { has } = await auth();
  const hasPremiumAccess = has({ plan: 'monthly' });
  console.log('hasPremiumAccess', hasPremiumAccess);
  const decision = await aj.protect(req, {
    userId: user?.primaryEmailAddress?.emailAddress ?? '',
    requested: isFinal ? 5 : 0,
  });

  console.log(decision);

  if (
    decision.reason.isRateLimit() &&
    decision?.reason?.remaining == 0 &&
    !hasPremiumAccess
  ) {
    return NextResponse.json({
      resp: 'No Free Credit Remaining. Please upgrade your plan.',
      ui: 'limit',
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4.1-mini',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: isFinal ? FINAL_PROMPT : PROMPT },
        ...messages,
      ],
    });

    console.log(completion.choices[0].message);
    const message = completion.choices[0].message;
    return NextResponse.json(JSON.parse(message.content ?? ''));
  } catch (e) {
    return NextResponse.json(e);
  }
}
