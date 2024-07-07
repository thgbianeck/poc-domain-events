import EventDispatcher from './event-dispatcher';
import SendEmailMessageHandler from './events/handlers/send-email-message-handler';
import SendMessageToRabbitMQHandler from './events/handlers/send-message-to-rabbitmq-handler';
import OrderPlacedEvent from './events/order-placed';

describe('Domain events tests', () => {
  it('should register an event', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageToRabbitMQHandler();

    eventDispatcher.register('OrderPlacedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['OrderPlacedEvent']).toBeDefined();
    expect(eventDispatcher.getEventHandlers['OrderPlacedEvent'].length).toBe(1);
  });

  it('should register two events', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendMessageToRabbitMQHandler();
    const eventHandler2 = new SendEmailMessageHandler();

    eventDispatcher.register('OrderPlacedEvent', eventHandler1);
    eventDispatcher.register('OrderPlacedEvent', eventHandler2);

    expect(eventDispatcher.getEventHandlers['OrderPlacedEvent']).toBeDefined();
    expect(eventDispatcher.getEventHandlers['OrderPlacedEvent'].length).toBe(2);
  });

  it('should notify when an event occured', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageToRabbitMQHandler();
    const eventHandlerSpy = jest.spyOn(eventHandler, 'handle');

    const event = new OrderPlacedEvent({
      orderId: 1,
      customerId: 2,
      amount: 100,
      currency: 'USD',
      paymentMethod: 'VISA',
    });

    eventDispatcher.register('OrderPlacedEvent', eventHandler);
    eventDispatcher.notify(event);

    expect(eventHandlerSpy).toHaveBeenCalled();
  });
});
