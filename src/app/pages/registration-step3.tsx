import { useNavigate, useParams } from "react-router-dom";
import { appRoutes } from "../constants";
import { Breadcrumbs } from "../components/breadcrumbs";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setUserData } from "../../features/registration/registration-slice";
import { RegistrationStep3Form } from "../components/registration-step3-form";
import { Loader } from "../components/loader";
import { IRegistrationStep3FormValues, IRegistrationUserData } from "../types";
import moment from "moment";
import { useGetMentorByLinkQuery } from "../../features/api/user-api-slice";
import {
  useFetchCountriesQuery,
  useFetchRegionsQuery,
  useFetchCitiesQuery,
} from "../../features/api/address-api-slice";
import { Form } from "antd";
import dayjs from "dayjs";

export const RegistrationStep3 = () => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.locale);
  const { mentor: mentorUrl } = useParams();
  const navigate = useNavigate();
  const { data: mentorLink } = useGetMentorByLinkQuery(String(mentorUrl));
  const { data: countries = [] } = useFetchCountriesQuery();
  const { data: regions = [] } = useFetchRegionsQuery();
  const { data: cities = [] } = useFetchCitiesQuery();
  const [form] = Form.useForm();
  const savedUserData = useAppSelector((state) => state.registration.userData);

  if (!mentorUrl) {
    return navigate(`${appRoutes.HOME}`);
  }
  if (!mentorLink?.mentor || !mentorLink?.link) return <Loader />;

  const { mentor, link } = mentorLink;

  const onFinish = (formValues: IRegistrationStep3FormValues) => {
    const selectedCountry = countries.find(
      (country) => country.id === formValues.country
    );
    const selectedRegion = regions.find(
      (region) => region.id === formValues.region
    );
    const selectedCity = cities.find((city) => city.id === formValues.city);

    const userData: IRegistrationUserData = {
      ...formValues,
      country: selectedCountry!,
      region: selectedRegion!,
      city: selectedCity!,
      mentor,
      dateOfBirth: moment(formValues?.dateOfBirth).format("DD.MM.YYYY"),
    };

    dispatch(setUserData(userData));
    navigate(`${appRoutes.REGISTRATION}/${link.name}/4`);
  };

  if (savedUserData) {
    form.setFieldsValue({
      ...savedUserData,
      dateOfBirth: dayjs(savedUserData?.dateOfBirth, "DD.MM.YYYY"),
      country: savedUserData.country.id,
      city: savedUserData.city.id,
      region: savedUserData?.region?.id,
    });
  }

  return (
    <main className="main partner-reg partner-reg--third">
      <Breadcrumbs />
      <section className="partner-reg__section">
        <RegistrationStep3Form
          onFinish={onFinish}
          locale={locale}
          mentorDto={mentor}
          link={link}
          form={form}
        />
      </section>
    </main>
  );
};
