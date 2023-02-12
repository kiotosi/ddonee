import EmitterManager from './EmitterManager';
import type { EmitterInstance } from './EmitterManager';
import * as ConvertTime from './TimeConverter';

// Groups of emitters
const EMITTER_GROUPS = {
  ON_TICK_GROUP: 'onTick',
  ON_FINAL_GROUP: 'onFinal',
};

/**
 * Timer class with event emitters
 */
export default class Timer {
  private ms = 0;
  private currentMs = 0;
  private timerId: number;
  private static MS_TWENTY_FIVE_MINUTES = ConvertTime.minuteToMillisecond(25);
  private emitManager = new EmitterManager(
    EMITTER_GROUPS.ON_FINAL_GROUP,
    EMITTER_GROUPS.ON_TICK_GROUP
  );

  constructor(hours: number, minutes: number) {
    const totalMSTime = this.handleTime(hours, minutes);
    this.ms = totalMSTime;
    this.currentMs = totalMSTime;
  }

  public start(): void {
    this.timerId = setInterval(() => {
      this.tick();
    }, ConvertTime.MS_ONE_SECOND);
  }

  public stop(): void {
    this.currentMs = this.ms;
    this.pause();
  }

  public pause(): void {
    clearInterval(this.timerId);
  }

  public addEmitter(timerState: EMIT_TIMER_STATE, emitterName: string, emitter: () => void): void {
    this.emitManager.addEmitter(EMITTER_GROUPS[timerState], {name: emitterName, callback: emitter})
  }

  public removeEmitter(timerState: EMIT_TIMER_STATE, emitterName: string): void {
    this.emitManager.removeEmitter(EMITTER_GROUPS[timerState], emitterName);
  }

  public changeTime(minutes?: number);
  public changeTime(hours?: number, minutes?: number): void {
    const time = this.handleTime(hours, minutes);
    this.ms = time;
    
    if (this.currentMs > this.ms) {
      this.currentMs = this.ms;
    }
  }

  private emit(timerState: EMIT_TIMER_STATE): void {
    this.emitManager.getEmitterGroup(EMITTER_GROUPS[timerState]).forEach(emit => {
      emit();
    });
  }

  private tick(): void {
    this.currentMs -= ConvertTime.MS_ONE_SECOND;
    this.emit('ON_TICK_GROUP');
    if (this.currentMs <= 0) {
      this.stop();
      this.emit('ON_FINAL_GROUP');
    }
  }

  private handleTime(hours?: number, minutes?: number) {
    let totalMSTime = 0;

    if (hours) {
      totalMSTime += ConvertTime.hourToMillisecond(hours);
    }

    if (minutes) {
      totalMSTime += ConvertTime.minuteToMillisecond(minutes);
    }

    return totalMSTime;
  }
}

type EMIT_TIMER_STATE = keyof typeof EMITTER_GROUPS;