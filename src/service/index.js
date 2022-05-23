export class Service {
  async createPostRequestReg(url, obj) {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      return res.statusText;
    }

    return await res.json();
  }

  async createPostRequestLog(url, obj) {
    const res = await fetch(url, {
      method: "POST",
      body: new URLSearchParams(obj),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      return res.statusText;
    }

    return await res.json();
  }

  async createPostRequestAddPost(url, obj) {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
    });
    if (!res.ok) {
      return res.statusText;
    }

    return await res.json();
  }

  async createGetRequestAddPost(skip, limit) {
    const res = await fetch(
      `http://10.130.19.30/api/items/?skip=${skip}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      }
    );
    if (!res.ok) {
      return res.statusText;
    }

    return await res.json();
  }
}
