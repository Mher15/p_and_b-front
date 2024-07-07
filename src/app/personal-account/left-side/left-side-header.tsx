import { Link } from "react-router-dom";
import { personalAccountRoutes } from "../data/constants";
import { IProfile, IUser } from "../../types";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface ILeftSideHeaderProps {
  user: IUser;
  profile: IProfile;
}

export const LeftSideHeader = ({ user, profile }: ILeftSideHeaderProps) => {
  return (
    <div className="lk-menu__header">
      <div className="lk-menu__header-left">
        <Link to={personalAccountRoutes.PROFILE}>
          <h2 className="title title--sm lk-menu__title">
            {`${user.lastName} ${user.name}`}
          </h2>
        </Link>

        <p className="lk-menu__copy-link" data-copy-text="true">
          <span data-copy-text-inner="true">id: {user.referralId}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.268C19.304 8.44353 19.5565 8.696 19.732 9.00003C19.9076 9.30406 20 9.64894 20 10V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H10C9.46957 20 8.96086 19.7893 8.58579 19.4142C8.21071 19.0391 8 18.5304 8 18V10C8 9.46957 8.21071 8.96086 8.58579 8.58579C8.96086 8.21071 9.46957 8 10 8H13M5.003 15.734C4.69812 15.5587 4.44486 15.3061 4.26876 15.0016C4.09266 14.6972 3.99996 14.3517 4 14V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H14C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6V14C16 14.5304 15.7893 15.0391 15.4142 15.4142C15.0391 15.7893 14.5304 16 14 16H11"
              stroke="#B3DB11"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>
      </div>
      <div className="lk-menu__profile-img">
        {profile?.avatar ? (
          <img src={`/static/${profile.avatar}`} alt="" />
        ) : (
          <Avatar size={64} icon={<UserOutlined />} />
        )}
      </div>
      <div className="lk-menu__menu-icon">
        <img src="/images/icons/lk_hamburger.svg" alt="" />
        <img src="/images/icons/lk_arrow.svg" alt="" />
      </div>
    </div>
  );
};
