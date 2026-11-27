/* Edit this file to update publication details, links, and media. */
window.STRIDER_CONFIG = {
  projectName: "STRIDER",
  headline: "Morph to Survive",
  subtitle: "Feasibility-Aware MPC for Rotor Thrust Saturation Mitigation in Morphable Multirotors",
  siteUrl: "https://milkomedia.github.io/STRIDER/",

  // Author order, affiliations, and contribution notes follow the manuscript.
  authors: [
    { name: "Jinu Ju", affiliation: "1", equalContribution: true },
    { name: "Dongjae Lee", affiliation: "2", equalContribution: true },
    { name: "Hanryung Shin", affiliation: "3" },
    { name: "Sunyoung Kong", affiliation: "4" },
    { name: "Youngjun Kim", affiliation: "5" },
    { name: "Seung Jae Lee", affiliation: "5", corresponding: true }
  ],
  affiliations: [
    { id: "1", name: "POSTECH", detail: "Department of Mechanical Engineering, Pohang University of Science and Technology (POSTECH), Pohang, Republic of Korea." },
    { id: "2", name: "Kyung Hee University", detail: "School of Mechanical Engineering, Kyung Hee University, Yongin, Republic of Korea." },
    { id: "3", name: "KAIST", detail: "Robotics Program, Korea Advanced Institute of Science and Technology (KAIST), Daejeon, Republic of Korea." },
    { id: "4", name: "Rainbow Robotics", detail: "Rainbow Robotics, Sejong, Republic of Korea." },
    { id: "5", name: "SeoulTech", detail: "Intelligent Robotics Engineering Program, School of Mechanical System Engineering, Seoul National University of Science and Technology (SeoulTech), Seoul, Republic of Korea." }
  ],
  authorNotes: "* Co-first authors · † Corresponding author",
  researchAffiliationNote: "Jinu Ju, Hanryung Shin, and Sunyoung Kong were also with the Department of Mechanical System Design Engineering, SeoulTech, when this work was conducted.",

  publication: {
    status: "Accepted",
    venue: "IEEE Robotics and Automation Letters",
    year: "2026",
    paperUrl: "",
    doiUrl: "",
    // Provisional accepted-manuscript citation; update from IEEE when available.
    bibtex: `@article{ju2026morph,
  title = {Morph to Survive: Feasibility-Aware {MPC} for Rotor Thrust Saturation Mitigation in Morphable Multirotors},
  author = {Ju, Jinu and Lee, Dongjae and Shin, Hanryung and Kong, Sunyoung and Kim, Youngjun and Lee, Seung Jae},
  journal = {IEEE Robotics and Automation Letters},
  year = {2026},
  note = {Accepted for publication, November 2026}
}`
  },

  links: {
    codeUrl: "https://github.com/Milkomedia/STRIDER_MPC_MuJoCo",
    documentationUrl: "",
    labUrl: "",
    contactUrl: "mailto:seungjae_lee@seoultech.ac.kr"
  },

  release: {
    // Set to "available" after the curated simulation has been released.
    status: "in-preparation",
    preparationText: "Development code available; curated release in preparation.",
    availableText: "Simulation code and plotting UI available."
  },

  hero: {
    image: "./assets/images/flight.webp",
    videoSrc: "./assets/videos/strider-teaser.mp4"
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
      {
        label: "Experiment 1. Saturation mitigation validation",
        start: 131
      },
      {
        label: "Experiment 2. Controller comparison",
        start: 233
      }
    ]
  },

  gallery: {
    scene: {
      src: "./assets/images/simulation.webp",
      videoSrc: "./assets/videos/mujoco-scene.mp4?v=crop1",
      alt: "MuJoCo development screenshot showing the STRIDER model carrying an offset payload.",
      caption: "MuJoCo simulation preview."
    },
    plots: {
      src: "./assets/images/plot-ui.webp",
      alt: "STRIDER plotting UI with position, attitude, torque, rotor thrust, morphing, and solver time histories.",
      caption: "Motion, rotor thrusts, morphing states, and solver time."
    }
  },

  // Each tab shows a prerecorded simulation and its controller description.
  controllers: [
    {
      id: "conventional",
      videoSrc: "./assets/videos/controller-conventional.mp4?v=crop1",
      name: "Conventional",
      kicker: "Fixed geometry",
      description: "Fixed rotor geometry with no attitude-reference correction.",
      properties: [
        ["Rotor-position morphing", "Disabled"],
        ["Attitude-reference correction", "Disabled"]
      ]
    },
    {
      id: "reference",
      videoSrc: "./assets/videos/controller-reference.mp4?v=crop1",
      name: "Reference method [15]",
      kicker: "Gradient-based morphing",
      description: "Gradient-based rotor-position optimization, without attitude-reference correction.",
      properties: [
        ["Rotor-position morphing", "Enabled"],
        ["Attitude-reference correction", "Disabled"]
      ]
    },
    {
      id: "morphing-only",
      videoSrc: "./assets/videos/controller-morphing-only.mp4?v=crop1",
      name: "Morphing-Only",
      kicker: "NMPC ablation",
      description: "NMPC optimizes rotor positions with attitude-reference correction disabled.",
      properties: [
        ["Rotor-position morphing", "Enabled"],
        ["Attitude-reference correction", "Disabled"]
      ]
    },
    {
      id: "proposed",
      videoSrc: "./assets/videos/controller-proposed.mp4?v=crop1",
      name: "Proposed",
      kicker: "Full formulation",
      description: "NMPC jointly optimizes rotor-position morphing and attitude-reference correction.",
      properties: [
        ["Rotor-position morphing", "Enabled"],
        ["Attitude-reference correction", "Enabled"]
      ]
    }
  ],

  referenceNote: "[15] C. Kim et al., ‘A morphing quadrotor that can optimize morphology for transportation,’ IROS 2021."
};
