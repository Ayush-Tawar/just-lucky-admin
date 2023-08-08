import cmsController from "./cmsController";
import contactusController from "./contactusController";
import eventsController from "./eventsController";
import faqController from "./faqController";
import subscribersController from "./subscribersController";
import venueBoookingController from "./venueBoookingController";

export const types = {
  EVENTS: "Events",
  FAQ: "FAQ",
  SUBSCRIBER: "SUBSCRIBER",
  CMS: "CMS",
  CONTACT_US: "ContactUs",
  VENUE_BOOKING: "Venue Bookings",
};

export const controller = {
  [types.EVENTS]: eventsController,
  [types.FAQ]: faqController,
  [types.SUBSCRIBER]: subscribersController,
  [types.CMS]: cmsController,
  [types.CONTACT_US]: contactusController,
  [types.VENUE_BOOKING]: venueBoookingController,
};
