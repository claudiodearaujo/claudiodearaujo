// Pure Satori element tree for the site's Open Graph image, one template
// reused for every content type (Visual §47: "Variações por tipo"). No I/O
// here so the layout can be unit tested without a font or a renderer.
//
// Colors are the dark palette from src/styles/_tokens.scss, copied rather
// than imported: this runs in plain Node against Satori's element tree, not
// in a browser that resolves CSS custom properties.
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const colors = {
  bg: '#090b10',
  border: '#334055',
  text: '#f3f6fa',
  textSecondary: '#aab4c3',
  textMuted: '#7c88a0',
  accent: '#6ea8fe',
};

const categoryLabels = {
  project: 'Project',
  article: 'Article',
  lab: 'Lab',
  decision: 'Architecture Decision',
  page: '',
};

export const categoryLabelFor = (type) => categoryLabels[type] ?? '';

/**
 * @param {{ category?: string, title: string, summary: string }} data
 */
export const buildOgTree = ({ category = '', title, summary }) => ({
  type: 'div',
  props: {
    style: {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 64,
      backgroundColor: colors.bg,
      fontFamily: 'Inter',
    },
    children: [
      // Brand row — CA monogram + wordmark, matching the site header.
      {
        type: 'div',
        props: {
          style: { display: 'flex', alignItems: 'center', gap: 16 },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  border: `1px solid ${colors.border}`,
                  color: colors.accent,
                  fontFamily: 'JetBrains Mono',
                  fontWeight: 700,
                  fontSize: 18,
                },
                children: 'CA',
              },
            },
            {
              type: 'div',
              props: {
                style: { color: colors.textSecondary, fontSize: 22 },
                children: 'Cláudio Araújo',
              },
            },
          ],
        },
      },
      // Middle block — category, title, summary.
      {
        type: 'div',
        props: {
          style: { display: 'flex', flexDirection: 'column', gap: 20 },
          children: [
            ...(category
              ? [
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        color: colors.accent,
                        fontFamily: 'JetBrains Mono',
                        fontWeight: 700,
                        fontSize: 24,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                      },
                      children: category,
                    },
                  },
                ]
              : []),
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  maxHeight: 3 * 76,
                  overflow: 'hidden',
                  color: colors.text,
                  fontFamily: 'Manrope',
                  fontWeight: 800,
                  fontSize: title.length > 40 ? 52 : 64,
                  lineHeight: 1.2,
                  letterSpacing: -1,
                },
                children: title,
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  maxHeight: 2 * 40,
                  overflow: 'hidden',
                  color: colors.textSecondary,
                  fontFamily: 'Inter',
                  fontSize: 28,
                  lineHeight: 1.4,
                  maxWidth: 980,
                },
                children: summary,
              },
            },
          ],
        },
      },
      // Footer row — domain, separated by a thin rule.
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            paddingTop: 24,
            borderTop: `1px solid ${colors.border}`,
            color: colors.textMuted,
            fontFamily: 'JetBrains Mono',
            fontSize: 22,
          },
          children: 'claudiodearaujo.dev.br',
        },
      },
    ],
  },
});
