export function parseHash() {
  let hash = window.location.hash;

  if (!hash) {
    return null;
  }

  hash = hash.slice(1);

  const params = new URLSearchParams(hash);

  if (!params.get("access-token") || !params.get("refresh-token")) {
    return null;
  }

  return {
    "access-token": params.get("access-token"),
    "refresh-token": params.get("refresh-token"),
  };
}
