import AddTaskTrigger from "@/features/web/pomodoro/components/addTaskTrigger";
import StateSelector from "@/features/web/pomodoro/components/stateSelector";
import TaskList from "@/features/web/pomodoro/components/taskList";
import Timer from "@/features/web/pomodoro/components/timer";
import TimerControls from "@/features/web/pomodoro/components/timerControls";

export default function Pomodoro() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex h-full w-[25%] flex-col items-center gap-12 py-28">
                <StateSelector />
                <Timer />
                <TimerControls />
                <hr className="border-border w-full border" />
                <div className="flex h-full w-full flex-col overflow-hidden">
                    <div className="mb-3 flex justify-between">
                        <h1 className="text-xl">Tarefas</h1>
                        <AddTaskTrigger />
                    </div>
                    <TaskList />
                </div>
            </div>
        </div>
    );
}
