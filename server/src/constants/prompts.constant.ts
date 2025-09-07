const SYSTEM_PROMPT = `
    You are a master thumbnail creative director AI. Your role is to transform
    user inputs into a structured, cinematic, and cohesive thumbnail design
    instruction for an AI image generator. 

    Core requirements:
    1. The thumbnail must tell a visual story aligned with the given title and description.
    2. Typography must match the chosen style, size, font, and color.
    3. Background must follow the selected backgroundType and details.
    4. Elements like stickers and CTA badge must be integrated seamlessly.
    5. Final output must match the chosen platform's aspect ratio (youtube, reel, etc.)
       and be delivered in the requested download format and quality.
  `;

function genUserPrompt({
  prompt,
  fontOptions,
  photoOptions,
  thumbnailElements,
  outputPreferences,
}: {
  prompt?: string;
  fontOptions: {
    mainTitle: string;
    description: string;
    fontStyle:
      | "modern"
      | "bold"
      | "handwritten"
      | "playful"
      | "professional"
      | "casual"
      | "funny"
      | "romantic";
    fontColor: string;
    backgroundColor: string;
    fontSize: "very-small" | "small" | "medium" | "large" | "very-large";
    fontFamily: string;
  };
  photoOptions: {
    backgroundType:
      | "blur-the-uploaded-photo"
      | "solid-background"
      | "gradient-background"
      | "ai-generated-background";
    someDetailAboutBackground: string;
  };
  thumbnailElements: {
    ctaBadge: string;
  };
  outputPreferences: {
    thumbnailSize:
      | "1280x720"
      | "1920x1080"
      | "1080x1080"
      | "1080x1350"
      | "1080x1920"
      | "1200x627"
      | "1584x396";
    downloadFormat: "png" | "jpg" | "jpeg" | "webp";
    downloadQuality: "low" | "medium" | "high";
  };
}) {
  const USER_PROMPT = `
You are designing a modern, eye-catching thumbnail with the following specifications:

Title Text: "${fontOptions.mainTitle}"
Subtitle/Description: "${fontOptions.description}"

[Typography]
- Font Style: ${fontOptions.fontStyle}
- Font Color: ${fontOptions.fontColor}
- Font Size: ${fontOptions.fontSize}
- Font Family: ${fontOptions.fontFamily}
- Background Color (behind text if needed): ${fontOptions.backgroundColor}

[Visual Background]
- Type: ${photoOptions.backgroundType} 
- Details/Theme: ${photoOptions.someDetailAboutBackground}

[Additional Elements]
- Call-to-Action Badge: ${thumbnailElements.ctaBadge}

[Output Requirements]
- Final Dimensions: ${outputPreferences.thumbnailSize}
- File Format: ${outputPreferences.downloadFormat}
- Quality: ${outputPreferences.downloadQuality}



[Design Guidelines]:
- Style must be bold, modern, and highly clickable.
- Text should be large, clear, and legible at small sizes.
- Use cohesive lighting, shadows, and depth for a polished, professional look.
- Maintain strong contrast between text and background.
- Center focus should draw the viewer’s eye to the title and key visuals.
- Avoid clutter; balance negative space and elements.
- Dimension must match ${outputPreferences.thumbnailSize} exactly.


${prompt ? `📝 Additional Creative Instructions from User: ${prompt}` : ""}



Generate ONE single thumbnail prompt ready for image creation based on these details.
`;

  return USER_PROMPT;
}

export { SYSTEM_PROMPT, genUserPrompt };
