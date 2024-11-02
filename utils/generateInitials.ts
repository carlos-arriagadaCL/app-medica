export function getInitials(name: string): string {
  const nameParts = name.split(" ");

  const initials = nameParts.map((part) => part.charAt(0).toUpperCase());

  return initials.join("");
}
