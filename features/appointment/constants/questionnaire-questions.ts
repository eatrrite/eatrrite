import type { QuestionnaireQuestion } from "@/features/appointment/types/questionnaire";

/** Same questions as PHP constants/questionnaire.php (core + symptoms + ready). */
export const QUESTIONNAIRE_QUESTIONS: QuestionnaireQuestion[] = [
  {
    "key": "name",
    "label": "Name",
    "type": "text",
    "required": true
  },
  {
    "key": "age",
    "label": "Age",
    "type": "number",
    "required": true,
    "min": 13,
    "max": 90
  },
  {
    "key": "gender",
    "label": "Gender",
    "type": "radio",
    "required": true,
    "options": [
      "Female",
      "Male"
    ]
  },
  {
    "key": "primary_goal",
    "label": "What is the primary change you want to achieve?",
    "type": "radio",
    "required": true,
    "options": [
      "Lose stubborn weight and reduce belly fat",
      "Understand and manage hormonal / perimenopausal changes",
      "Improve blood sugar / insulin resistance / diabetes",
      "Improve fatty liver / metabolic health",
      "Improve digestion, bloating, acidity or gut health",
      "Improve energy, sleep and recovery",
      "Reduce inflammation, puffiness and feeling of heaviness",
      "Address multiple health concerns together"
    ]
  },
  {
    "key": "current_symptoms",
    "label": "Which of these are you experiencing currently?",
    "type": "checkbox-groups",
    "required": true,
    "groups": {
      "Mind \u2022 Mood \u2022 Sleep": [
        "Brain fog or difficulty concentrating",
        "Mood swings, irritability or feeling emotionally overwhelmed",
        "Poor sleep / frequent waking / waking up unrefreshed"
      ],
      "Face \u2022 Skin \u2022 Hair": [
        "Puffy face or bags under the eyes",
        "Noticeable changes in skin or hair"
      ],
      "Energy \u2022 Appetite \u2022 Weight": [
        "Fatigue despite a full night's sleep",
        "Energy crash or sleepiness after meals",
        "Increased hunger, cravings or difficulty feeling satisfied",
        "Unexplained weight gain / difficulty losing weight"
      ],
      "Abdomen \u2022 Digestion": [
        "Increasing belly fat / waistline",
        "Bloating, acidity, gas or indigestion"
      ],
      "Blood Sugar \u2022 Metabolic Health": [
        "Blood sugar fluctuations / insulin resistance / diabetes"
      ],
      "Fluid Balance \u2022 Inflammation": [
        "Puffy hands, feet or face, especially after waking",
        "Feeling persistently heavy, swollen or inflamed"
      ]
    }
  },
  {
    "key": "symptom_duration",
    "label": "How long have you been dealing with these concerns?",
    "type": "radio",
    "required": true,
    "options": [
      "Less than 3 months",
      "3\u20136 months",
      "6\u201312 months",
      "1\u20133 years",
      "More than 3 years"
    ]
  },
  {
    "key": "attempted_solutions",
    "label": "What have you already tried?",
    "type": "checkbox",
    "required": true,
    "follow_key": "missing_piece",
    "follow_label": "What do you believe has been missing until now?",
    "follow_type": "textarea",
    "follow_required": false,
    "options": [
      "Diet plans",
      "Intermittent fasting",
      "Calorie restriction",
      "Gym / exercise",
      "Yoga",
      "Supplements",
      "Online programs / apps",
      "Guidance from health professionals",
      "Multiple approaches, but the results did not last"
    ]
  },
  {
    "key": "readiness_level",
    "label": "How ready are you to make your health a priority?",
    "type": "radio",
    "required": true,
    "options": [
      "I am ready to take action and follow through consistently.",
      "I am ready to change, but I need the right structure and accountability.",
      "I am ready to stop experimenting and follow a personalised approach."
    ]
  },
  {
    "key": "investment_readiness",
    "label": "If we determine that a personalised Eat Rrite program is the right fit for you, are you prepared to make the necessary time, effort and financial investment to follow through?",
    "type": "radio",
    "required": true,
    "options": [
      "Yes. I am ready to invest in getting this right.",
      "Yes. I understand that meaningful health transformation requires a financial, time and personal commitment.",
      "Yes. If I see that the approach is right for me, I am prepared to commit to it."
    ]
  }
];
