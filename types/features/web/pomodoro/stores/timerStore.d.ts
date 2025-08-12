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
    intervalRef: NodeJS.Timeout | null;
    currentState: TimerState;

    /** Set task and sync it with database */
    addTask(name: string, task: Task): void;
    /** Set task without syncing */
    setTask(name: string, task: Task): void;

    editTask(name: string, updates: Partial<Task>): void;
    deleteTask(name: string): void;

    setSelectedTask(name: string | null): void;
    completeTask(name: string): void;
    skipPhase(): void;
    finishCycle(): void;

    setCurrentState(state: TimerState): void;
    setTime(time: Time): void;
    updateTime(): void;
    startTimer(): void;
    pauseTimer(): void;
    resetTimer(): void;
    toggleRunning(): void;
}
