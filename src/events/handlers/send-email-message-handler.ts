import EventHandlerInterface from '../../event-handler.interface';
import EventInterface from '../../event.interface';
import OrderPlacedEvent from '../order-placed';

export default class SendEmailMessageHandler
  implements EventHandlerInterface<EventInterface>
{
  handle(event: OrderPlacedEvent): void {
    console.log('SendEmailHandler: ', event);
  }
}
