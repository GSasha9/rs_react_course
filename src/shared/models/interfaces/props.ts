export interface Props {
  type?: string;
  className?: string;
  callback?: () => void | Promise<void>;
  children?: React.ReactNode;
}
