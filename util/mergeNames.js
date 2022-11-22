export default function mergeNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
