export const getEvents = async() => {
  try {
    const response = await fetch("/api/events");
    return await response.json();
  } catch (error) {
    return []
  }
}