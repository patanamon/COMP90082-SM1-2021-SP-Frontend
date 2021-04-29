function formatProjectInfo(data) {
  var tempoStore = [];

  for (let i = 0, len = data.data.length; i < len; i++) {
    tempoStore.push({
      space_key: data.data[i].space_key,
      label: data.data[i].space_name,
      link:
        "https://confluence.cis.unimelb.edu.au:8443/display/" +
        data.data[i].space_key +
        "/Home",
    });
  }

  return tempoStore;
}