<script>
  import { onMount } from 'svelte';
  import dayjs from 'dayjs'
  import {isEventOver, prettyDate, dayName} from "$lib/functions/utilities";
  import IconTrain from "$lib/components/icons/IconTrain.svelte";
  import IconCheck from "../lib/components/icons/IconCheck.svelte";
  import LoadingSpinner from "../lib/components/LoadingSpinner.svelte";
  import {getEvents} from "$lib/functions/database";

  /*let databaseSchedule = [
    {
      "date": "2022-12-05",
      "time": "7:30pm",
      "category": "Hockey",
      "title": "Stars vs Senators",
      "location": "American Airlines Center",
      "locationURL": "https://goo.gl/maps/dyWN4jWZbffMkCpY8",
      "trainFriendly": true,
      "description": ""
    },
  ]*/
	let databaseSchedule = [];

	let isLoading = true;
  let events = [];
  let categories = [];

  let shouldShowOldEvents = false;

  onMount(async() => {
		databaseSchedule = await getEvents();

    filterOldEvents();
    createListOfCategories();

    isLoading = false;
  })

  const createListOfCategories = () => {
    let tempCategories = databaseSchedule.map(item => item.category)
    categories = [...new Set(tempCategories)];
    categories.sort();
  }

  const filterOldEvents = () => {
    events = databaseSchedule.filter(item => {
      if(!isEventOver(item.event_date)) {
        return item;
      }
    })
  }

  const handleShouldShowOldEvents = () => {
    if(shouldShowOldEvents) {
      filterOldEvents();
    } else {
      events = [...databaseSchedule];
    }

    shouldShowOldEvents = !shouldShowOldEvents
  }

  const handleCategoryFilter = (e) => {
    const newCategory = e.target.value;

    if(newCategory === "All") {
      filterOldEvents();
      return;
		}

    events = databaseSchedule.filter(item => {
      if(item.category === newCategory && !isEventOver(item.event_date)) {
        return item;
      }
    })
  }
</script>


<header>
	<h1>Calendar</h1>

	<div class="category-filter">
		<label>Filter</label>
		<select on:change={handleCategoryFilter}>
			<option value="All">All</option>
			{#each categories as category}
				<option value={category}>{category}</option>
			{/each}
		</select>
	</div>

	<button on:click={handleShouldShowOldEvents}>Show Old Events {#if shouldShowOldEvents}<IconCheck />{/if}</button>
</header>


<div id="calendar">
	{#each events as event}
		<section class={isEventOver(event.event_date) ? 'event-over' : ''}>
			<div class="date">
				<p>{prettyDate(event.event_date)}</p>
				<p>{dayName(event.event_date)}</p>
				<p class="time">{event.time}</p>
			</div>



			<div class="details">
				<h2>{event.category} - {event.title}</h2>

				<p class="location"><a href={event.locationURL} target="_blank" rel="noreferrer">{event.location}</a></p>

				{#if event.trainFriendly}
					<p class="train"><IconTrain /> Train Friendly</p>
				{/if}

			</div>
		</section>
	{:else}
		{#if isLoading}
			<div style="text-align: center">
				<LoadingSpinner />
			</div>
		{:else}
			<p class="no-events-found">No events found</p>
		{/if}
	{/each}
</div>



<style>
    #calendar {
        max-width: 1200px;
        margin: 0 auto;
        text-align: left;
    }

    #calendar > section {
        display: flex;
				flex-wrap: wrap;
        gap: 32px;
				border-bottom: 1px solid #393939;
				padding-bottom: 24px;
        margin-bottom: 36px;
    }

    section > .date {
				order: 2;
		}

    section > .details {
        order: 1;
    }

    #calendar h2, #calendar p {
        margin: 0 0 8px 0;
        line-height: 1em;
    }

    .location a {
        color: #eee;
    }

    .train {
        font-size: 18px;
    }

    header {
        display: flex;
				flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-bottom: 36px;
    }

    header h1 {
        margin: 0;
    }

		.category-filter {
				display: flex;
				align-items: center;
				gap: 4px;
		}

    .category-filter label {
        font-size: 12px;
    }

    .event-over {
        opacity: 0.5
    }

		.no-events-found {
				text-align: center;
		}

		@media screen and (min-width: 768px) {
        section > .date {
            order: 1;
        }

        section > .details {
            order: 2;
        }

        .date {max-width: 170px; width: 100%;}
        .time {max-width: 100px; width: 100%;}
		}
</style>