import Backendless from 'backendless'
import {BackendlessAPP_ID, BackendlessAPI_KEY} from "$lib/server/utilities";

Backendless.initApp(BackendlessAPP_ID, BackendlessAPI_KEY);


export async function GET() {
  // Get the list of items from Backendless. By default, this limits to 100 I think
  try {
    // Set to filter by date
    let queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setSortBy( ["event_date"] );
    queryBuilder.setPageSize(100);
    let records = await Backendless.Data.of( "click_sporting_events" ).find(queryBuilder)

    return new Response(JSON.stringify(records));
  } catch (error) {
    console.log(">>>Error", error)
    return new Response(JSON.stringify([]));
  }
}


export function POST({ url }) {
  return new Response(JSON.stringify({}));
}