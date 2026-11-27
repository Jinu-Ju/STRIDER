# STRIDER Research Website

**Project page:** https://milkomedia.github.io/STRIDER/

**Morph to Survive: Feasibility-Aware MPC for Rotor Thrust Saturation Mitigation in Morphable Multirotors**

A static research project website presenting the STRIDER platform, control approach, flight experiments, and simulation resources. This package uses HTML, CSS, and JavaScript. No Node.js installation, package manager, or build step is required.

## Website and simulation repositories

These repositories serve separate purposes:

| Resource | Location | Contents |
| --- | --- | --- |
| Website repository | [Milkomedia/STRIDER](https://github.com/Milkomedia/STRIDER) | Website source, research images, and media configuration |
| Published website | [milkomedia.github.io/STRIDER/](https://milkomedia.github.io/STRIDER/) | The research project page served by GitHub Pages |
| Simulation repository | [Milkomedia/STRIDER_MPC_MuJoCo](https://github.com/Milkomedia/STRIDER_MPC_MuJoCo) | MuJoCo model, controllers, execution code, plotting UI, and installation instructions |

The website links visitors to the simulation repository through its **Simulation code** and **View repository** buttons. Updating this website does not change the simulation code. The controller tabs on this page display prerecorded videos and concise descriptions; the MuJoCo simulation and plotting UI run locally after downloading the separate simulation repository.

Use the uppercase **STRIDER** repository name and **/STRIDER/** URL consistently, including in the paper. All local website assets use relative paths.

## Included content

- Paper title and research overview from the supplied manuscript.
- An RA-L Accepted label, as requested for the publication website.
- Actual flight and platform photographs.
- Descriptions of Conventional, Reference method [15], Morphing-Only, and Proposed controllers.
- MuJoCo and controller simulation videos, plus a plotting UI screenshot with an enlargement dialog.
- YouTube or direct MP4 playback with optional chapter buttons.
- Configurable publication links, authors, affiliations, DOI, and BibTeX.
- Responsive layouts, keyboard-accessible tabs, and reduced-motion support.

The six authors, five affiliations, co-first authors, corresponding author, and accepted-manuscript citation follow `RAL_strider-6.pdf`. Compact institution names appear below the title; full departments and the research-time affiliation note are available under **Author affiliations**. BibTeX is expandable. The paper URL and DOI remain empty until available; the manuscript PDF is not bundled. Existing video files and chapter times are preserved.

The code link currently points to the development repository. Once the curated four-controller simulation is public, update its URL if necessary and set `release.status` to `"available"`. The included screenshots are development previews, not a new quantitative comparison.

## Update the existing website

The `Milkomedia/STRIDER` repository already exists. Use one of the following methods.

### GitHub web interface

1. Extract this ZIP and open the enclosed `STRIDER` folder.
2. Open `Milkomedia/STRIDER` on GitHub.
3. Select **Add file → Upload files**.
4. Upload the **contents** of the extracted folder, including `index.html`, the `assets` folder, and the documentation files. Do not upload the ZIP or add an extra enclosing `STRIDER` directory inside the repository.
5. Commit the changes to the branch used by GitHub Pages.
6. Wait for the Pages deployment to finish, then refresh https://milkomedia.github.io/STRIDER/.

Keep `index.html` at the repository root. Preserve any unrelated files and existing GitHub Pages settings in the repository.

Suggested commit message:

```text
Add authors and simplify project-page copy
```

### Git command line

If you already have a local clone, copy the extracted folder's contents into that clone. Do not replace or remove its `.git` directory. Inspect existing local changes before copying files.

If you need a fresh clone:

```bash
git clone https://github.com/Milkomedia/STRIDER.git
cd STRIDER
```

After copying the updated website files into the clone:

```bash
git status
git diff
git add index.html assets README.md ASSETS.md
git commit -m "Add authors and simplify project-page copy"
git push
```

Run these commands in the website repository, not in `STRIDER_MPC_MuJoCo`. No force push is needed. Use your existing GitHub authentication configuration.

## GitHub Pages configuration

If Pages is already configured successfully, retain that configuration. For a branch-based deployment, open **Settings → Pages → Build and deployment**:

| Setting | Value |
| --- | --- |
| Source | Deploy from a branch |
| Branch | main, or the branch containing this website |
| Folder | / (root) |

Select **Save**. Check the deployment result in Actions and the published URL under Settings → Pages.

A separate `milkomedia.github.io` repository is not required for this project site. Do not enter `milkomedia.github.io` in the Custom domain field. An existing account-level custom domain may affect the final destination; the address displayed by GitHub is authoritative.

## Local preview

From the extracted `STRIDER` folder:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000/ and stop the server with **Ctrl+C**. Opening `index.html` directly is sufficient for a layout preview, but use HTTP for YouTube playback: a `file://` page can lack the referrer information required by the player.

## Edit publication details and links

Most content is configured in `assets/site-config.js`.

| Setting | Purpose |
| --- | --- |
| `siteUrl` | Canonical project URL: `https://milkomedia.github.io/STRIDER/` |
| `headline`, `subtitle` | Final paper title |
| `authors`, `affiliations` | Author order, institution numbers, compact names, and full department details |
| `authorNotes`, `researchAffiliationNote` | Contribution markers and research-time affiliations |
| `publication.status`, `publication.venue`, `publication.year`, `publication.message` | Publication status, venue, year, and short message |
| `publication.paperUrl` | Public paper URL or relative PDF path |
| `publication.doiUrl` | DOI URL beginning with `https://doi.org/` |
| `publication.citationText`, `publication.bibtex` | Confirmed bibliographic information |
| `links.codeUrl` | Curated simulation repository URL, without the `.git` suffix |
| `links.documentationUrl` | Installation or usage documentation |
| `links.labUrl`, `links.contactUrl` | Laboratory or contact link |
| `release.status` | `"in-preparation"` or `"available"` |
| `video.youtubeId` | YouTube ID or share/watch URL |
| `video.chapters` | Experiment start times in seconds |
| `gallery.scene`, `gallery.plots` | Screenshots, alt text, and captions |
| `controllers`, `referenceNote` | Controller descriptions and reference details |

Leave unknown publication URLs empty. Author objects use `affiliation` for the institution number, `equalContribution: true` for `*`, and `corresponding: true` for `†`. Each affiliation object provides `id`, `name`, and `detail`. Optional author `url` values may link to confirmed personal pages.

Use a JavaScript template literal for multiline BibTeX. The citation panel and copy button appear only when BibTeX is supplied. Keep the final title and metadata in `index.html` consistent with the configuration for search engines and visitors with JavaScript disabled.

The uppercase URL is included in `site-config.js` and in the canonical URL, Open Graph URL, and Open Graph image URL in `index.html`. If the project URL changes again, update all of these fields.

## Connect the experiment video

### YouTube

For a large supplementary video, upload it to YouTube and enable embedding. Set visibility to **Unlisted** or **Public**. Unlisted videos remain accessible to anyone who has the link; Private videos are unsuitable for general visitors.

In the existing `video` object in `assets/site-config.js`, keep `provider: "youtube"` and enter the actual video ID or share URL in `youtubeId`:

```javascript
video: {
  provider: "youtube",
  youtubeId: "",
  src: "",
  mimeType: "video/mp4",
  poster: "./assets/images/flight.webp",
  chapters: [
    { label: "Thrust redistribution", start: null },
    { label: "Payload transportation", start: null },
    { label: "Controller comparison", start: null }
  ]
},
```

A chapter with `start: null` is hidden. Set `start: 135` for a segment beginning at 2 minutes 15 seconds. Each button seeks to its start time; it does not stop playback at the end of that experiment.

The player loads after a visitor clicks Play or a chapter button. It uses `youtube-nocookie.com` and a `strict-origin-when-cross-origin` referrer policy. A **Watch on YouTube** link is also provided. The site includes no analytics or external fonts.

### Direct MP4

Use a publicly accessible URL that returns the actual video file, or place a small video in `assets/media/`. A sign-in page or download-confirmation link is not a direct media URL.

Edit these fields inside the existing `video` object:

```javascript
provider: "mp4",
src: "./assets/media/experiments.mp4",
mimeType: "video/mp4",
```

H.264 video and AAC audio in an MP4 container are suitable for broad browser compatibility. Byte-range support on the hosting server helps seeking in large files. Direct MP4 playback uses the same chapter settings.

Large supplementary videos are better hosted separately from the website repository. Consult the official GitHub file and Pages limits linked below before uploading video files.

If FFmpeg is installed, an optional conversion command is:

```bash
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart experiments.mp4
```

Check the resulting file size and quality. Conversion is not required merely to link a YouTube video.

## Optional hero video

The hero displays the flight photograph by default. To use a short silent loop, add `assets/media/teaser.mp4` and edit the existing `hero` object:

```javascript
hero: {
  image: "./assets/images/flight.webp",
  videoSrc: "./assets/media/teaser.mp4"
},
```

The loop includes a pause/play button and respects reduced-motion preferences. Use a short teaser rather than the full supplementary video.

## File reference

| File | Purpose |
| --- | --- |
| `index.html` | Page structure, default content, and metadata |
| `assets/site-config.js` | Publication, links, media, and controller configuration |
| `assets/styles.css` | Visual styling and responsive layouts |
| `assets/app.js` | Configuration rendering, video controls, tabs, image dialog, and citation copying |
| `assets/images/` | Research photographs and development screenshots |
| `assets/media/` | Optional locally hosted videos |
| `assets/favicon.svg` | Browser tab icon |
| `.nojekyll` | Serve the static files without Jekyll processing |
| `ASSETS.md` | Image provenance and release preparation notes |

Paths and filenames must match their capitalization. Preserve the uppercase `/STRIDER/` project URL after citing it in the paper.

## Check after deployment

- Confirm that the page and images load at https://milkomedia.github.io/STRIDER/.
- Check the four controller tabs, MuJoCo/Plot UI tabs, and screenshot enlargement.
- After adding the actual video, check playback, fullscreen, chapter seeking, and the external video link.
- Add only confirmed paper, DOI, author, and citation information.
- Update the simulation URL, release status, and installation documentation together.
- Replace development screenshots and captions if the released UI changes.

For a 404, check the root `index.html`, the selected Pages branch/folder, and the Actions deployment result. If old content remains visible, refresh the browser cache after deployment completes.

## References

- [GitHub Pages overview](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Configuring the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub file size limits](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Embedding YouTube videos](https://support.google.com/youtube/answer/171780?hl=en)
- [YouTube visibility settings](https://support.google.com/youtube/answer/157177?hl=en)

Presentation references: [UMI](https://umi-gripper.github.io/) and [robomimic](https://robomimic.github.io/). The website implementation was written for STRIDER; their code, logos, and videos are not included.
