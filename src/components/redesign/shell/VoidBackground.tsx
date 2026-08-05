/**
 * Fundo global do tema "void": gradiente radial + grão + vinheta.
 * Montado uma única vez no App, atrás de todas as rotas (main/footer têm z-index 3).
 */
const VoidBackground = () => (
  <>
    <div className="bg-grad" aria-hidden="true" />
    <div className="bg-grain" aria-hidden="true" />
    <div className="bg-vig" aria-hidden="true" />
  </>
);

export default VoidBackground;
