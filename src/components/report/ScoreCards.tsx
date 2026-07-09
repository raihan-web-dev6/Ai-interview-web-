import {
  Brain,
  MessageSquare,
  Mic,
} from "lucide-react";

interface Props {
  interview: any;
}

function ScoreCards({ interview }: Props) {
  const cards = [
    {
      title: "Technical",
      score: interview.technicalScore,
      icon: Brain,
    },
    {
      title: "Communication",
      score: interview.communicationScore,
      icon: MessageSquare,
    },
    {
      title: "Confidence",
      score: interview.confidenceScore,
      icon: Mic,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl bg-white p-8 text-center shadow-lg"
          >

            <Icon
              size={40}
              className="mx-auto text-blue-600"
            />

            <p className="mt-5 text-lg font-medium text-slate-500">
              {card.title}
            </p>

            <h2 className="mt-2 text-5xl font-bold text-slate-900">
              {card.score}%
            </h2>

          </div>
        );
      })}

    </div>
  );
}

export default ScoreCards;