export function formatImportedProjectData(data) {
  let spaceKeys = [];
  let spaceNames = [];
  let spaceLinks = [];
  for (let i = 0, len = data.length; i < len; i++) {
    spaceKeys.push(data[i]["space_key"]);
    spaceNames.push(data[i]["space_name"]);
    spaceLinks.push("https://confluence.cis.unimelb.edu.au:8443/display/" + data[i]["space_key"] + "/Home");
  }
  return {
    spaceKeys,
    spaceNames,
    spaceLinks,
  };
}