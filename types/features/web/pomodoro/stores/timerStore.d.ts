export interface Task {
    cicles: number;
    completedCicles: number;
    completed: boolean;
}

export interface Time {
    min: number;
    sec: number;
}

export type TimerState = "task" | "short break" | "long break";

export interface TimerStore {
    tasks: Record<string, Task>;
    selectedTask: string | null;

    time: Time;
    running: boolean;
    currentState: TimerState;

    addTask(name: string, task: Task): void;
    setTask(name: string, task: Task): void;
    editTask(name: string, updates: Partial<Task>): void;
    deleteTask(name: string): void;
    setSelectedTask(name: string | null): void;
    completeTask(name: string): void;

    setCurrentState(state: TimerState): void;
    updateTime(time: Time): void;
    resetTimer(): void;
    toggleRunning(): void;
    startTimer(): void;
    pauseTimer(): void;
    skipPhase(): void;

    finishCycle(): void;
}
