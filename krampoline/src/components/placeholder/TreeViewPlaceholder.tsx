type Props = {
  className?: string;
};

export default function TreeViewPlaceholder({ className }: Props) {
  return <p className={className}>Loading...</p>;
}
