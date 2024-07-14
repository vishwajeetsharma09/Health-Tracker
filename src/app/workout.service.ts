import { Injectable } from '@angular/core';

export interface WorkoutEntry {
  id: string;
  userName: string;
  workoutType: string;
  workoutMinutes: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workoutEntries: WorkoutEntry[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedData = localStorage.getItem('workoutEntries');
    if (storedData) {
      this.workoutEntries = JSON.parse(storedData);
    } else {
      this.initializeSampleData();
    }
  }

  private initializeSampleData(): void {
    this.workoutEntries = [
      
        { id: this.generateId(), userName: 'John Doe', workoutType: 'Running', workoutMinutes: 30 },
        { id: this.generateId(), userName: 'John Doe', workoutType: 'Cycling', workoutMinutes: 45 },
        { id: this.generateId(), userName: 'Jane Smith', workoutType: 'Swimming', workoutMinutes: 60 },
        { id: this.generateId(), userName: 'Jane Smith', workoutType: 'Running', workoutMinutes: 20 },
        { id: this.generateId(), userName: 'Mike Johnson', workoutType: 'Yoga', workoutMinutes: 50 },
        { id: this.generateId(), userName: 'Mike Johnson', workoutType: 'Cycling', workoutMinutes: 40 },
        { id: this.generateId(), userName: 'John Doe', workoutType: 'Swimming', workoutMinutes: 35 },
        { id: this.generateId(), userName: 'John Doe', workoutType: 'Yoga', workoutMinutes: 25 },
        { id: this.generateId(), userName: 'Jane Smith', workoutType: 'Cycling', workoutMinutes: 50 },
        { id: this.generateId(), userName: 'Jane Smith', workoutType: 'Yoga', workoutMinutes: 30 },
        { id: this.generateId(), userName: 'Mike Johnson', workoutType: 'Running', workoutMinutes: 30 },
        { id: this.generateId(), userName: 'Mike Johnson', workoutType: 'Swimming', workoutMinutes: 55 },
        { id: this.generateId(), userName: 'John Doe', workoutType: 'Running', workoutMinutes: 40 },
      
    
    
    ];
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('workoutEntries', JSON.stringify(this.workoutEntries));
  }

  getWorkoutEntries(): WorkoutEntry[] {
    return this.workoutEntries;
  }

  addWorkoutEntry(entry: Omit<WorkoutEntry, 'id'>): void {
    const newEntry = { ...entry, id: this.generateId() };
    this.workoutEntries.push(newEntry);
    this.saveToLocalStorage();
  }

  deleteWorkoutEntry(id: string): void {
    this.workoutEntries = this.workoutEntries.filter(entry => entry.id !== id);
    this.saveToLocalStorage();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  resetLocalStorage(): void {
    localStorage.removeItem('workoutEntries');
    this.initializeSampleData();
  }
}