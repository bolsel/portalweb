'use client';

import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';
import createShareButton from 'react-share/lib/hocs/createShareButton';
import objectToGetParams from 'react-share/lib/utils/objectToGetParams';
import BaseIcon from '../icons/base-icon';

function whatsappLink(
  url: string,
  {
    title,
    separator = '  ',
    quote = ' ',
  }: { title?: string; separator?: string; quote?: string }
) {
  return (
    'https://api.whatsapp.com/send' +
    objectToGetParams({
      text: (title ? title + separator + url : url) + separator + quote,
    })
  );
}

const WhatsappShareButton = createShareButton(
  'whatsapp',
  whatsappLink,
  (props) => ({}),
  {}
);

export type ShareItemProps = {
  url: string;
  title: string;
  quote?: string;
  beforeOnClick?: () => Promise<void> | void;
};
const ShareItem = ({
  url,
  title,
  quote = '',
  beforeOnClick,
}: ShareItemProps) => {
  const networks: any = [
    {
      name: 'facebook',
      component: FacebookShareButton,
      icon: <BaseIcon icon="logo-color-facebook" inline className="w-6 h-6" />,
      props: () => ({ title, quote, hashtag: 'bolselkab' }),
    },
    {
      name: 'twitter',
      component: TwitterShareButton,
      icon: <BaseIcon icon="logo-color-twitter" inline className="w-6 h-6" />,
      props: () => ({
        title,
        quote,
        hashtags: ['bolselkab', 'bolsel', 'portalbolsel'],
      }),
    },
    {
      name: 'whatsapp',
      component: WhatsappShareButton,
      icon: <BaseIcon icon="logo-color-whatsapp" inline className="w-6 h-6" />,
      props: () => ({ title, quote }),
    },
    {
      name: 'telegram',
      component: TelegramShareButton,
      icon: <BaseIcon icon="logo-color-telegram" inline className="w-6 h-6" />,
      props: () => ({ title, quote }),
    },
    {
      name: 'email',
      component: EmailShareButton,
      icon: <BaseIcon icon="mail" color="#E53935" inline className="w-6 h-6" />,
      props: () => ({ subject: title, body: quote }),
    },
  ];

  return (
    <ul className="flex justify-between lg:justify-start gap-4 w-full overflow-auto">
      {networks.map((network, i) => (
        <li
          key={i}
          className="w-16 h-16 p-2 rounded-lg text-center text-xs text-gray-600 leading-[18px]
      hover:bg-gray-100 hover:text-gray-800 transition-colors ease-in-out duration-150"
        >
          <network.component
            beforeOnClick={beforeOnClick}
            className="flex flex-col gap-1 w-full h-full items-center justify-center capitalize"
            windowHeight={400}
            windowWidth={550}
            {...network.props()}
            {...{
              url,
            }}
          >
            {network.icon} {network.name}
          </network.component>
        </li>
      ))}
    </ul>
  );
};

export default ShareItem;
