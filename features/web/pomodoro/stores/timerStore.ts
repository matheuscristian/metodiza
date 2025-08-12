import {
    deleteTask,
    updateTask,
} from "@/features/web/pomodoro/actions/timerActions";
import {
    Task,
    Time,
    TimerState,
    TimerStore,
} from "@/types/features/web/pomodoro/stores/timerStore";
import { create } from "zustand";

const DEFAULT_TIMES: Record<TimerState, Time> = {
    task: { min: 25, sec: 0 },
    "short break": { min: 5, sec: 0 },
    "long break": { min: 15, sec: 0 },
};

const playCompletionSound = () => {
    new Audio("/ogg/tone.ogg").play();
};

const useTimerStore = create<TimerStore>((set, get) => {
    // Helper functions
    const updateTaskState = (name: string, updates: Partial<Task>) => {
        const currentTask = get().tasks[name];
        if (!currentTask) return null;

        const updatedTask = { ...currentTask, ...updates };

        if (
            updates.completed &&
            updatedTask.completedCicles < updatedTask.cicles
        ) {
            updatedTask.completedCicles = updatedTask.cicles;
        }

        updateTask(name, updatedTask);

        set((s) => ({
            tasks: { ...s.tasks, [name]: updatedTask },
        }));

        return updatedTask;
    };

    const clearTimerInterval = () => {
        const interval = get().intervalRef;
        if (interval) {
            clearInterval(interval);
            set({ intervalRef: null });
        }
    };

    const resetTimeForState = (state: TimerState) => {
        set({ time: { ...DEFAULT_TIMES[state] } });
    };

    // Main store implementation
    return {
        tasks: {},
        selectedTask: null,
        time: DEFAULT_TIMES.task,
        running: false,
        currentState: "task",
        intervalRef: null,

        addTask(name, task) {
            set((s) => ({ tasks: { ...s.tasks, [name]: task } }));
            updateTask(name, task);
        },

        setTask(name, task) {
            set((s) => ({ tasks: { ...s.tasks, [name]: task } }));
        },

        editTask(name, updates) {
            updateTaskState(name, updates);
        },

        deleteTask(name) {
            set((s) => {
                const newTasks = { ...s.tasks };
                delete newTasks[name];

                return {
                    tasks: newTasks,
                    selectedTask:
                        s.selectedTask === name ? null : s.selectedTask,
                };
            });

            deleteTask(name);
        },

        setSelectedTask(name) {
            if (!name || get().tasks[name]) {
                set({ selectedTask: name });
            }
        },

        completeTask(name) {
            updateTaskState(name, { completed: true });
        },

        setCurrentState(state) {
            set({ currentState: state });
            get().pauseTimer();
            resetTimeForState(state);
        },

        setTime(time) {
            set({ time });
        },

        updateTime() {
            const { finishCycle, time } = get();
            let { min, sec } = time;

            sec -= 1;
            if (sec < 0) {
                min -= 1;
                sec = 59;
            }

            if (min < 0) {
                finishCycle();
                return;
            }

            set({ time: { min, sec } });
        },

        resetTimer() {
            const { pauseTimer, currentState } = get();
            pauseTimer();
            resetTimeForState(currentState);
        },

        toggleRunning() {
            const { running } = get();

            if (running) {
                get().pauseTimer();
            } else {
                get().startTimer();
            }
        },

        startTimer() {
            clearTimerInterval();

            set({
                running: true,
                intervalRef: setInterval(() => get().updateTime(), 1000),
            });
        },

        pauseTimer() {
            clearTimerInterval();
            set({ running: false });
        },

        skipPhase() {
            get().finishCycle();
        },

        finishCycle() {
            const {
                currentState,
                setCurrentState,
                selectedTask,
                tasks,
                editTask,
            } = get();
            playCompletionSound();

            get().pauseTimer();

            if (currentState === "task") {
                if (selectedTask && tasks[selectedTask]) {
                    const task = tasks[selectedTask];
                    const completedCicles = task.completedCicles + 1;
                    const completed = completedCicles >= task.cicles;

                    editTask(selectedTask, {
                        completedCicles,
                        completed,
                    });

                    if (completed) {
                        setCurrentState("long break");
                        get().startTimer();
                        return;
                    }
                }
                setCurrentState("short break");
            } else {
                setCurrentState("task");
            }

            get().startTimer();
        },
    };
});

export default useTimerStore;
