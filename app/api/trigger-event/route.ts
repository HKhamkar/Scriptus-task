import pusher from "../../../lib/pusher";

export async function POST(req: Request) {
  console.log("Received POST request.");

  try {
    const body = await req.json();
    const { taskId, newStatus } = body;

    console.log("Parsed request body:", { taskId, newStatus });

    await pusher.trigger("kanban-board", "task-moved", {
      taskId,
      newStatus,
    });

    console.log("Triggered Pusher event successfully.");
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error("Error triggering Pusher event:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
