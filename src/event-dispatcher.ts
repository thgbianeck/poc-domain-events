import EventDispatcherInterface from './event-dispatcher.interface';
import EventHandlerInterface from './event-handler.interface';
import EventInterface from './event.interface';

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};
  register(eventName: string, handler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(handler);
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    const eventHandlers = this.eventHandlers[eventName];

    if (eventHandlers) {
      eventHandlers.forEach((handler) => handler.handle(event));
    }
  }

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }
}
