window.tailwindConfig = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "inverse-primary": "#494bd6",
                "on-primary-fixed-variant": "#2f2ebe",
                "surface-tint": "#c0c1ff",
                "error": "#ffb4ab",
                "on-secondary": "#233147",
                "surface-container-high": "#222a3d",
                "secondary-fixed-dim": "#b9c7e3",
                "outline": "#908fa0",
                "on-primary-container": "#0d0096",
                "on-primary": "#1000a9",
                "secondary-fixed": "#d5e3ff",
                "surface": "#0b1326",
                "on-secondary-fixed": "#0d1c31",
                "surface-dim": "#0b1326",
                "inverse-surface": "#dae2fd",
                "primary-fixed": "#e1e0ff",
                "on-secondary-container": "#abb9d5",
                "background": "#0b1326",
                "on-background": "#dae2fd",
                "tertiary-container": "#009eb9",
                "surface-container-lowest": "#060e20",
                "surface-container": "#171f33",
                "on-tertiary-fixed": "#001f26",
                "error-container": "#93000a",
                "tertiary-fixed-dim": "#4cd7f6",
                "on-surface-variant": "#c7c4d7",
                "secondary": "#b9c7e3",
                "on-tertiary-fixed-variant": "#004e5c",
                "on-secondary-fixed-variant": "#39475e",
                "surface-bright": "#31394d",
                "outline-variant": "#464554",
                "on-error-container": "#ffdad6",
                "on-error": "#690005",
                "tertiary": "#4cd7f6",
                "tertiary-fixed": "#acedff",
                "on-tertiary-container": "#002f38",
                "on-primary-fixed": "#07006c",
                "surface-variant": "#2d3449",
                "primary-fixed-dim": "#c0c1ff",
                "surface-container-low": "#131b2e",
                "on-tertiary": "#003640",
                "secondary-container": "#3c4a61",
                "surface-container-highest": "#2d3449",
                "on-surface": "#dae2fd",
                "primary-container": "#8083ff",
                "inverse-on-surface": "#283044",
                "primary": "#c0c1ff"
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                full: "9999px"
            },
            spacing: {
                "margin-desktop": "40px",
                gutter: "24px",
                "margin-mobile": "16px",
                unit: "8px",
                "container-max": "1200px"
            },
            fontFamily: {
                "headline-lg": ["Inter"],
                "code-sm": ["JetBrains Mono"],
                "body-sm": ["Inter"],
                "headline-xl": ["Inter"],
                "body-md": ["Inter"],
                "headline-lg-mobile": ["Inter"],
                "label-caps": ["JetBrains Mono"]
            },
            fontSize: {
                "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }],
                "code-sm": ["13px", { lineHeight: "18px", fontWeight: "500" }],
                "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
                "headline-xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
                "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
                "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "600" }],
                "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.1em", fontWeight: "600" }]
            }
        }
    }
};

if (window.tailwind && window.tailwind.config) {
    window.tailwind.config = window.tailwindConfig;
}

document.addEventListener("DOMContentLoaded", function () {
    const mobileButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    if (!mobileButton || !mobileMenu) return;

    mobileButton.addEventListener("click", function () {
        const expanded = mobileButton.getAttribute("aria-expanded") === "true";
        mobileButton.setAttribute("aria-expanded", String(!expanded));
        mobileMenu.classList.toggle("hidden");
        // toggle body scroll when menu open
        document.documentElement.classList.toggle("overflow-hidden");
    });

    // Close mobile menu on navigation link click
    mobileMenu.addEventListener("click", function (e) {
        const target = e.target.closest("a");
        if (!target) return;
        mobileMenu.classList.add("hidden");
        mobileButton.setAttribute("aria-expanded", "false");
        document.documentElement.classList.remove("overflow-hidden");
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
            mobileButton.setAttribute("aria-expanded", "false");
            document.documentElement.classList.remove("overflow-hidden");
            mobileButton.focus();
        }
    });

    const mediaInput = document.getElementById("fitnessMediaInput");
    const gallery = document.getElementById("fitnessGallery");
    const mediaCount = document.getElementById("fitnessMediaCount");
    const mainMedia = document.querySelector(".fitness-main-media");

    if (mediaInput && gallery) {
        mediaInput.addEventListener("change", function (event) {
            const files = Array.from(event.target.files || []);
            if (!files.length) return;

            files.forEach((file) => {
                const figure = document.createElement("figure");
                figure.className = "fitness-card overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-low";

                if (file.type.startsWith("image/")) {
                    const image = document.createElement("img");
                    image.src = URL.createObjectURL(file);
                    image.alt = file.name;
                    image.className = "fitness-media h-64 w-full object-cover";
                    figure.appendChild(image);
                } else if (file.type.startsWith("video/")) {
                    const video = document.createElement("video");
                    video.src = URL.createObjectURL(file);
                    video.controls = true;
                    video.preload = "metadata";
                    video.className = "fitness-media h-64 w-full object-cover";
                    figure.appendChild(video);
                }

                gallery.prepend(figure);
            });

            const totalItems = gallery.querySelectorAll("figure").length;
            if (mediaCount) mediaCount.textContent = totalItems + " item" + (totalItems === 1 ? "" : "s");

            mediaInput.value = "";
        });
    }

    if (mainMedia && mainMedia.tagName === "VIDEO") {
        const source = mainMedia.querySelector("source");
        if (source) {
            mainMedia.load();
        }
    }
});
