/* Edit this file to update publication details, links, and media. */
window.STRIDER_CONFIG = {
  projectName: "STRIDER",
  headline: "Morph to Survive",
  subtitle: "Feasibility-Aware MPC for Rotor Thrust Saturation Mitigation in Morphable Multirotors",
  siteUrl: "https://milkomedia.github.io/STRIDER/",

  // Leave unconfirmed metadata empty. No placeholder names are published.
  authors: [],
  // Example: [{ name: "Author Name", url: "https://example.edu/", affiliation: "1" }]
  affiliations: [],
  // Example: ["1. Department, University"]
  publication: {
    status: "Accepted",
    venue: "IEEE Robotics and Automation Letters",
    paperUrl: "",
    doiUrl: "",
    citationText: "",
    bibtex: ""
  },

  links: {
    codeUrl: "https://github.com/Milkomedia/STRIDER_MPC_MuJoCo",
    documentationUrl: "",
    labUrl: "",
    contactUrl: ""
  },
  release: {
    // Set to "available" after the curated simulation has been released.
    status: "in-preparation",
    preparationText: "The curated simulation release is in preparation. The linked repository currently contains the development version.",
    availableText: "Run the MuJoCo simulation locally and inspect the response with the plotting UI."
  },

  hero: {
    image: "./assets/images/flight.webp",
    // Optional short, silent MP4 loop. Leave empty to display the photograph.
    videoSrc: ""
  },
  video: {
    // Use "youtube" for a hosted video or "mp4" for a direct video URL/file.
    provider: "youtube",
    youtubeId: "https://youtu.be/ldRSqi8bl2Q",
    src: "",
    mimeType: "video/mp4",
    poster: "./assets/images/flight.webp",
    // Chapter times are seconds from the start. Null hides the chapter.
    chapters: [
      { label: "Thrust redistribution", start: null },
      { label: "Payload transportation", start: null },
      { label: "Controller comparison", start: null }
    ]
  },

  gallery: {
    scene: {
      src: "./assets/images/simulation.webp",
      alt: "MuJoCo development screenshot showing the STRIDER model carrying an offset payload.",
      caption: "MuJoCo development preview from the current repository."
    },
    plots: {
      src: "./assets/images/plot-ui.webp",
      alt: "STRIDER plotting UI with position, attitude, torque, rotor thrust, morphing, and solver time histories.",
      caption: "Plotting UI development preview from the current repository."
    }
  },

  // These tabs describe the controllers; they do not run a browser simulation.
  controllers: [
    {
      id: "conventional", name: "Conventional", kicker: "Fixed geometry",
      description: "Keeps the rotor positions fixed and uses the baseline flight controller. The required moment is handled through the fixed thrust-allocation geometry.",
      properties: [["Rotor-position morphing", "Disabled"], ["Attitude-reference correction", "Disabled"], ["Morphing strategy", "Fixed rotor positions"]]
    },
    {
      id: "reference", name: "Reference method [15]", kicker: "Gradient-based morphing",
      description: "Adapts the rotor configuration using a gradient-based morphology optimization baseline, without the proposed attitude-reference correction.",
      properties: [["Rotor-position morphing", "Enabled"], ["Attitude-reference correction", "Disabled"], ["Morphing strategy", "Gradient-based optimization"]]
    },
    {
      id: "morphing-only", name: "Morphing-Only", kicker: "NMPC ablation",
      description: "Uses NMPC to optimize rotor-position commands while keeping attitude-reference correction disabled. This isolates the contribution of predictive rotor-position morphing.",
      properties: [["Rotor-position morphing", "Enabled"], ["Attitude-reference correction", "Disabled"], ["Morphing strategy", "Predictive optimization"]]
    },
    {
      id: "proposed", name: "Proposed", kicker: "Full formulation",
      description: "Jointly optimizes rotor-position commands and attitude-reference correction within the NMPC prediction horizon, accounting for the coupled attitude and morphing response.",
      properties: [["Rotor-position morphing", "Enabled"], ["Attitude-reference correction", "Enabled"], ["Morphing strategy", "Joint predictive optimization"]]
    }
  ],
  referenceNote: "Reference method: gradient-based morphology optimization, based on C. Kim et al., ‘A morphing quadrotor that can optimize morphology for transportation,’ IROS 2021."
};
