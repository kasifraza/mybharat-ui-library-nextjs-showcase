import type { ComponentType, CSSProperties } from "react";
import {
  ArrowRight2 as ArrowRight2Icon,
  Award as AwardIcon,
  Book1 as Book1Icon,
  Calendar as CalendarIcon,
  ClipboardText as ClipboardTextIcon,
  Clock as ClockIcon,
  ColorSwatch as ColorSwatchIcon,
  Discover as DiscoverIcon,
  Global as GlobalIcon,
  Heart as HeartIcon,
  Home2 as Home2Icon,
  Location as LocationIcon,
  Magicpen as MagicpenIcon,
  Moon as MoonIcon,
  Profile as ProfileIcon,
  Profile2User as Profile2UserIcon,
  SearchNormal1 as SearchNormal1Icon,
  SecuritySafe as SecuritySafeIcon,
  Send2 as Send2Icon,
  Share as ShareIcon,
  Sun1 as Sun1Icon,
  TickCircle as TickCircleIcon,
  VolumeHigh as VolumeHighIcon,
} from "iconsax-react";

export interface IconProps {
  size?: number | string;
  className?: string;
  style?: CSSProperties;
}

type IconsaxVariant = "Linear" | "Outline" | "Broken" | "Bold" | "Bulk" | "TwoTone";

type IconsaxIcon = ComponentType<
  IconProps & { color?: string; variant?: IconsaxVariant }
>;

/**
 * iconsax-react 0.0.8 relies on `defaultProps` (color: "currentColor"),
 * which React 19 no longer applies to function components — icons would
 * render with no stroke/fill color. This wrapper re-applies the defaults.
 */
const withColor = (Icon: IconsaxIcon): ComponentType<IconProps> => {
  const Wrapped = ({
    size = 20,
    ...rest
  }: IconProps) => <Icon color="currentColor" size={size} {...rest} />;
  Wrapped.displayName = `MybIcon(${(Icon as { displayName?: string }).displayName ?? "Icon"})`;
  return Wrapped;
};

export const ArrowRight2 = withColor(ArrowRight2Icon);
export const Award = withColor(AwardIcon);
export const Book1 = withColor(Book1Icon);
export const Calendar = withColor(CalendarIcon);
export const ClipboardText = withColor(ClipboardTextIcon);
export const Clock = withColor(ClockIcon);
export const ColorSwatch = withColor(ColorSwatchIcon);
export const Discover = withColor(DiscoverIcon);
export const Global = withColor(GlobalIcon);
export const Heart = withColor(HeartIcon);
export const Home2 = withColor(Home2Icon);
export const Location = withColor(LocationIcon);
export const Magicpen = withColor(MagicpenIcon);
export const Moon = withColor(MoonIcon);
export const Profile = withColor(ProfileIcon);
export const Profile2User = withColor(Profile2UserIcon);
export const SearchNormal1 = withColor(SearchNormal1Icon);
export const SecuritySafe = withColor(SecuritySafeIcon);
export const Send2 = withColor(Send2Icon);
export const Share = withColor(ShareIcon);
export const Sun1 = withColor(Sun1Icon);
export const TickCircle = withColor(TickCircleIcon);
export const VolumeHigh = withColor(VolumeHighIcon);

export const CATEGORY_ICONS: Record<string, ComponentType<IconProps>> = {
  Environment: Global,
  Education: Book1,
  Health: Heart,
  Sports: Award,
  "Culture & Arts": ColorSwatch,
  "Disaster Relief": SecuritySafe,
};
