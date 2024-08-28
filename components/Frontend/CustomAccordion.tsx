import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FAQItem = {
  qn: string;
  ans: string | JSX.Element;
};

export default function CustomAccordion({ FAQS }: { FAQS: FAQItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {FAQS.map((faq, i) => {
        return (
          <AccordionItem key={i} value={faq.qn}>
            <AccordionTrigger>{faq.qn}</AccordionTrigger>
            <AccordionContent>{faq.ans}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
