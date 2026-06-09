/* global React, useTweaks, TweaksPanel, TweakSection, TweakColor, TweakToggle, TweakRadio */
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#4CB8E8",
  "motion": true,
  "density": "regular"
}/*EDITMODE-END*/;

function DaltonTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--cyan", t.accent);
  }, [t.accent]);

  useEffect(() => {
    document.body.classList.toggle("no-motion", !t.motion);
  }, [t.motion]);

  useEffect(() => {
    document.documentElement.setAttribute("data-density", t.density);
    window.dispatchEvent(new Event("resize")); // redraw org connectors
  }, [t.density]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Marca" />
      <TweakColor
        label="Cor de acento"
        value={t.accent}
        options={["#4CB8E8", "#5EC8F0", "#38BDFA", "#3A9FD5"]}
        onChange={(v) => setTweak("accent", v)}
      />

      <TweakSection label="Organograma" />
      <TweakRadio
        label="Densidade"
        value={t.density}
        options={["compact", "regular", "comfy"]}
        onChange={(v) => setTweak("density", v)}
      />
      <TweakToggle
        label="Animações ao vivo"
        value={t.motion}
        onChange={(v) => setTweak("motion", v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<DaltonTweaks />);
