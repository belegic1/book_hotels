import prisma from "../libs/prismadb"

export interface IListingsParams{
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  location?: string
  category?: string;
}
export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      location,
      category
    } = params;
    let query: any = {};


    if (userId) {
      query.userId = userId
    }
    if (category) {
      query.category = category
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    if (location) {
    
      query.locationValue = location;
        
      
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              },
            ]
          }
        }
      }
    }


    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc"
      }
    })

    const safeListings = listings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }))
    return safeListings;
  } catch (error:any) {
    throw new Error(error)
  }
}