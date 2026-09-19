export function DogSVG({ size = 64, className = '', isCelebrating = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Dog companion"
    >
      {/* Animated Tail */}
      <g className="pet-tail-dog">
        <path d="M76 64 C86 54, 92 42, 86 32" stroke="#E5A866" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>

      {/* Body & Belly */}
      <ellipse cx="50" cy="67" rx="27" ry="21" fill="#E5A866" />
      <ellipse cx="50" cy="71" rx="18" ry="13" fill="#FFF2E2" />

      {/* Left & Right Ears */}
      <g className="pet-ear-left">
        <ellipse cx="32" cy="28" rx="8" ry="15" fill="#D2904B" transform="rotate(-15 32 28)" />
      </g>
      <g className="pet-ear-right">
        <ellipse cx="68" cy="28" rx="8" ry="15" fill="#D2904B" transform="rotate(15 68 28)" />
      </g>

      {/* Head */}
      <circle cx="50" cy="40" r="20" fill="#E5A866" />
      <ellipse cx="50" cy="44" rx="13" ry="11" fill="#FFF2E2" />

      {/* Eyes with Blinking Animation */}
      <g className="pet-eye">
        <circle cx="42" cy="38" r="3.5" fill="#261A10" />
        <circle cx="43.5" cy="36.5" r="1.2" fill="#FFFFFF" />
        <circle cx="58" cy="38" r="3.5" fill="#261A10" />
        <circle cx="59.5" cy="36.5" r="1.2" fill="#FFFFFF" />
      </g>

      {/* Nose & Mouth */}
      <ellipse cx="50" cy="44.5" rx="3.8" ry="2.8" fill="#261A10" />
      <path d="M46 48 Q50 51 54 48" stroke="#8A5A30" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="51" rx="2.5" ry="2" fill="#FF8A8A" />

      {/* Cheerful Blush */}
      <circle cx="36" cy="44" r="3.5" fill="#FFB4AA" opacity="0.5" />
      <circle cx="64" cy="44" r="3.5" fill="#FFB4AA" opacity="0.5" />

      {/* Collar with Golden Tag */}
      <path d="M37 56 Q50 60 63 56" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <circle cx="50" cy="59" r="2.8" fill="#F59E0B" />

      {/* Front Paws */}
      <ellipse cx="37" cy="85" rx="6.5" ry="4.5" fill="#E5A866" />
      <ellipse cx="37" cy="86" rx="4.5" ry="2.5" fill="#FFF2E2" />
      <ellipse cx="63" cy="85" rx="6.5" ry="4.5" fill="#E5A866" />
      <ellipse cx="63" cy="86" rx="4.5" ry="2.5" fill="#FFF2E2" />

      {/* Celebration Party Hat */}
      {isCelebrating && (
        <g className="animate-scale-in">
          <polygon points="50,6 40,24 60,24" fill="#F59E0B" />
          <polygon points="50,6 44,24 56,24" fill="#FCD34D" />
          <circle cx="50" cy="6" r="3" fill="#EC4899" />
          <circle cx="45" cy="18" r="1.5" fill="#FFFFFF" />
          <circle cx="53" cy="14" r="1.5" fill="#3B82F6" />
        </g>
      )}
    </svg>
  )
}

export function CatSVG({ size = 64, className = '', isCelebrating = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Cat companion"
    >
      {/* Animated Tail */}
      <g className="pet-tail-cat">
        <path d="M75 64 C90 52, 92 34, 82 26 C78 22, 74 26, 76 30" stroke="#94A3B8" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      </g>

      {/* Body & Belly */}
      <ellipse cx="50" cy="67" rx="25" ry="21" fill="#94A3B8" />
      <ellipse cx="50" cy="71" rx="16" ry="13" fill="#E2E8F0" />

      {/* Ears with Twitches */}
      <g className="pet-ear-left">
        <polygon points="32,28 26,10 42,22" fill="#94A3B8" />
        <polygon points="33,26 28,14 40,22" fill="#FDA4AF" />
      </g>
      <g className="pet-ear-right">
        <polygon points="68,28 74,10 58,22" fill="#94A3B8" />
        <polygon points="67,26 72,14 60,22" fill="#FDA4AF" />
      </g>

      {/* Head */}
      <circle cx="50" cy="40" r="19" fill="#94A3B8" />
      <ellipse cx="50" cy="44" rx="12" ry="10" fill="#E2E8F0" />

      {/* Eyes with Emerald Sparkle & Blinking */}
      <g className="pet-eye">
        <ellipse cx="42" cy="38" rx="3.8" ry="4.2" fill="#10B981" />
        <ellipse cx="42" cy="38" rx="2" ry="3.6" fill="#064E3B" />
        <circle cx="43.5" cy="36.5" r="1.2" fill="#FFFFFF" />
        <ellipse cx="58" cy="38" rx="3.8" ry="4.2" fill="#10B981" />
        <ellipse cx="58" cy="38" rx="2" ry="3.6" fill="#064E3B" />
        <circle cx="59.5" cy="36.5" r="1.2" fill="#FFFFFF" />
      </g>

      {/* Whiskers */}
      <line x1="20" y1="42" x2="36" y2="43" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="20" y1="46" x2="36" y2="45" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="80" y1="42" x2="64" y2="43" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="80" y1="46" x2="64" y2="45" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />

      {/* Nose & Mouth */}
      <polygon points="50,44 47.5,46.5 52.5,46.5" fill="#FDA4AF" />
      <path d="M47 48 Q50 51 53 48" stroke="#64748B" strokeWidth="1.4" fill="none" strokeLinecap="round" />

      {/* Blush */}
      <circle cx="36" cy="45" r="3.2" fill="#FFB4AA" opacity="0.4" />
      <circle cx="64" cy="45" r="3.2" fill="#FFB4AA" opacity="0.4" />

      {/* Collar with Golden Bell */}
      <path d="M38 56 Q50 60 62 56" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="50" cy="59" r="2.5" fill="#F59E0B" />

      {/* Paws */}
      <ellipse cx="38" cy="85" rx="6.5" ry="4.5" fill="#94A3B8" />
      <ellipse cx="38" cy="86" rx="4.5" ry="2.5" fill="#E2E8F0" />
      <ellipse cx="62" cy="85" rx="6.5" ry="4.5" fill="#94A3B8" />
      <ellipse cx="62" cy="86" rx="4.5" ry="2.5" fill="#E2E8F0" />

      {/* Celebration Party Hat */}
      {isCelebrating && (
        <g className="animate-scale-in">
          <polygon points="50,6 40,24 60,24" fill="#F59E0B" />
          <polygon points="50,6 44,24 56,24" fill="#FCD34D" />
          <circle cx="50" cy="6" r="3" fill="#8B5CF6" />
          <circle cx="46" cy="17" r="1.5" fill="#FFFFFF" />
          <circle cx="53" cy="13" r="1.5" fill="#EC4899" />
        </g>
      )}
    </svg>
  )
}
