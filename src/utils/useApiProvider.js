import useAboutusApi from "src/api/useAboutusApi";
import useCommonApi from "src/api/useCommonApi";
import useDashboardApi from "src/api/useDashboardApi";
import useFoodDrinkApi from "src/api/useFoodDrinkApi";
import useGalleryApi from "src/api/useGalleryApi";
import useMenuApi from "src/api/useMenuApi";
import useVenueApi from "src/api/useVenueApi";
import { types } from "src/controllers";

export default function useApiProvider({ authToken: authToken }) {
  const faqApi = useCommonApi({
    authToken: authToken,
    type: types.FAQ,
  });
  const eventsApi = useCommonApi({
    authToken: authToken,
    type: types.EVENTS,
  });
  const cmsApi = useCommonApi({
    authToken: authToken,
    type: types.CMS,
  });
  const subscribersApi = useCommonApi({
    authToken: authToken,
    type: types.SUBSCRIBER,
  });
  const contactUsApi = useCommonApi({
    authToken: authToken,
    type: types.CONTACT_US,
  });
  const venueBookingApi = useCommonApi({
    authToken: authToken,
    type: types.VENUE_BOOKING,
  });
  const aboutusApi = useAboutusApi(authToken);
  const galleryApi = useGalleryApi(authToken);
  const menuApi = useMenuApi(authToken);
  const foodDrinkApi = useFoodDrinkApi(authToken);
  const venueApi = useVenueApi(authToken);
  const dashboardApi = useDashboardApi(authToken);

  return {
    faqApi,
    eventsApi,
    cmsApi,
    subscribersApi,
    contactUsApi,
    venueBookingApi,
    aboutusApi,
    galleryApi,
    menuApi,
    venueApi,
    dashboardApi,
    foodDrinkApi,
  };
}
