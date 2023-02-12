export default class EmitterManager {
  
  // This collection (map) contains a collection of emitter groups (another map)
  // Emitter Collection have EmitterGroups
  // Emitter Groups have Emitter
  private groups: EmitterCollection = new Map();

  constructor(...groupNameList: string[]) {
    groupNameList.forEach(groupName => {
      this.groups.set(groupName, new Map as EmitterGroup);
    });

    console.log(this.groups);
  }

  public addEmitter(groupName: string, emitter: EmitterInstance) {
    if (this.checkEmitter(groupName, emitter.name)) {
      const err = new Error("There's already one emitter with name: " + emitter.name);
      console.error(err);
      return;
    }

    this.groups.get(groupName).set(emitter.name, emitter.callback);
  }

  public removeEmitter(groupName: string, emitterName: string) {
    if (!this.checkEmitter(groupName, emitterName)) {
      const err = new Error("There's no emitter with name " + emitterName);
      console.error(err);
      return;
    }

    this.groups.get(groupName).delete(emitterName);
  }

  public getEmitter(groupName: string, emitterName: string) {
    if(!this.checkEmitter(groupName, emitterName)) {
      const err = new Error("There's no emitter with name " + emitterName);
      console.error(err);
      return;
    }

    return this.groups.get(groupName).get(emitterName);
  }

  public getEmitterGroup(groupName: string) {
    if (!this.checkGroup(groupName)) {
      const err = new Error("There's no such group named as " + (groupName));
      console.error(err);
      return;
    }

    return Array.from(this.groups.get(groupName).values());
  }

  /**
   * Checks if group in collection of emitter groups
   * @param groupName Group name in emitter collection
   * @returns Collection have group (boolean)
   */
  private checkGroup(groupName: string) {
    const isGroupExists = this.groups.has(groupName);

    if (!isGroupExists) {
      const noGroupError = new Error('There\'s no group named ' + groupName);
      console.error(noGroupError);
    }

    return isGroupExists;
  }

  /**
   * Checks if emitter exists
   * @param groupName Group name in emitter collection
   * @param emitterName Name of the emitter
   * @returns Does emitter exists? (boolean)
   */
  private checkEmitter(groupName: string, emitterName: string) {

    if(!this.checkGroup(groupName)) {
      return;
    }

    return this.groups.get(groupName).has(emitterName);
  }
}

export interface EmitterInstance {
  name: string;
  callback: () => void;
}

type Emitter = () => void;
type EmitterGroup = Map<string, Emitter>;
type EmitterCollection = Map<string, EmitterGroup>;
