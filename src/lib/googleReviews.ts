export type GoogleReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
};

export type GooglePlaceReviews = {
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
  mapsUri?: string;
};

type RawGoogleReview = {
  authorAttribution?: { displayName?: string };
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
};

type RawPlaceDetails = {
  rating?: number;
  userRatingCount?: number;
  reviews?: RawGoogleReview[];
  googleMapsUri?: string;
};

export async function getGoogleReviews(): Promise<GooglePlaceReviews | null> {
  const apiKey = import.meta.env.GOOGLE_PLACES_API_KEY;
  const placeId = import.meta.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return null;
  }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri',
      },
    });

    if (!res.ok) {
      console.error('Google Places API error:', res.status, await res.text());
      return null;
    }

    const data = (await res.json()) as RawPlaceDetails;

    const reviews: GoogleReview[] = (data.reviews ?? []).map((r) => ({
      authorName: r.authorAttribution?.displayName ?? 'Client Google',
      rating: r.rating ?? 5,
      text: r.text?.text ?? r.originalText?.text ?? '',
      relativeTime: r.relativePublishTimeDescription ?? '',
    }));

    return {
      rating: data.rating ?? 0,
      userRatingCount: data.userRatingCount ?? 0,
      reviews,
      mapsUri: data.googleMapsUri,
    };
  } catch (err) {
    console.error('Failed to fetch Google reviews:', err);
    return null;
  }
}
