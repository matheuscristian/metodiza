import {
    deleteTask,
    updateTask,
} from "@/features/web/pomodoro/actions/timerActions";
import {
    Time,
    TimerState,
    TimerStore,
} from "@/types/features/web/pomodoro/stores/timerStore";
import { create } from "zustand";

const defaultTimes: Record<TimerState, Time> = {
    task: { min: 25, sec: 0 },
    "short break": { min: 5, sec: 0 },
    "long break": { min: 15, sec: 0 },
};

const useTimerStore = create<TimerStore>((set, get) => ({
    tasks: {},
    selectedTask: null,
    time: defaultTimes["task"],
    running: false,
    currentState: "task",

    addTask(name, task) {
        set((s) => ({ tasks: { ...s.tasks, [name]: task } }));
        updateTask(name, task);
    },

    setTask(name, task) {
        set((s) => ({ tasks: { ...s.tasks, [name]: task } }));
    },

    editTask(name, updates) {
        set((s) => {
            if (!s.tasks[name]) return {};
            const updated = { ...s.tasks[name], ...updates };
            updateTask(name, updated);
            return {
                tasks: {
                    ...s.tasks,
                    [name]: updated,
                },
            };
        });
    },

    deleteTask(name) {
        set((s) => {
            const newTasks = { ...s.tasks };
            delete newTasks[name];
            return {
                tasks: newTasks,
                selectedTask: s.selectedTask === name ? null : s.selectedTask,
            };
        });

        deleteTask(name);
    },

    setSelectedTask(name) {
        set((s) => {
            if (!name || s.tasks[name]) return { selectedTask: name };
            return {};
        });
    },

    completeTask(name) {
        set((s) => {
            if (!s.tasks[name]) return {};
            const updated = { ...s.tasks[name], completed: true };
            updateTask(name, updated);
            return {
                tasks: {
                    ...s.tasks,
                    [name]: updated,
                },
            };
        });
    },

    setCurrentState(state) {
        set(() => ({
            currentState: state,
            time: { ...defaultTimes[state] },
        }));
    },

    updateTime(time) {
        set(() => ({ time }));
    },

    resetTimer() {
        const { currentState } = get();
        set(() => ({
            time: { ...defaultTimes[currentState] },
            running: false,
        }));
    },

    toggleRunning() {
        set((s) => ({ running: !s.running }));
    },

    startTimer() {
        set(() => ({ running: true }));
    },

    pauseTimer() {
        set(() => ({ running: false }));
    },

    skipPhase() {
        const { finishCycle } = get();
        finishCycle();
    },

    finishCycle() {
        const { currentState, setCurrentState, selectedTask, tasks } = get();

        const tone = new Audio("/ogg/tone.ogg");
        tone.play();

        if (currentState === "task") {
            const task = selectedTask ? tasks[selectedTask] : undefined;
            if (task && selectedTask) {
                const completedCicles = task.completedCicles + 1;
                const completed = completedCicles >= task.cicles;

                const updated = {
                    ...task,
                    completedCicles,
                    completed,
                };

                updateTask(selectedTask, updated);

                set((s) => ({
                    tasks: {
                        ...s.tasks,
                        [selectedTask]: updated,
                    },
                }));

                if (completed) {
                    setCurrentState("long break");
                    return;
                }
            }
            setCurrentState("short break");
        } else {
            setCurrentState("task");
        }
    },
}));

export default useTimerStore;
