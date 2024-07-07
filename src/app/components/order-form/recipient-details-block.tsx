import { LastNameInput } from "../form/last-name-input";
import { NameInput } from "../form/name-input";
import { PatronymicInput } from "../form/patronymic-input";
import { PhoneInput } from "../form/phone-input";
import { EmailInput } from "../form/email-input";
import { translate } from "../../translation";

interface IRecipientDetailsProps {
  locale: string;
}

export const RecipientDetails = ({ locale }: IRecipientDetailsProps) => {
  return (
    <div className="order__block">
      <h2 className="title title--sm order__title">
        {translate("order.recipientDetails", locale)}
      </h2>
      <div className="order__col order__col--3">
        <LastNameInput locale={locale} />
        <NameInput locale={locale} />
        <PatronymicInput locale={locale} />
      </div>
      <div className="order__col order__col--2 fixed">
        <PhoneInput locale={locale} />
        <EmailInput locale={locale} />
      </div>
    </div>
  );
};
