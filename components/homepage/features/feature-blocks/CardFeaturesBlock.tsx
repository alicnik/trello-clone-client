import { FeatureBlock, LearnMoreExpandable } from './feature-block-component';

export const CardFeaturesBlock = () => {
  return (
    <FeatureBlock
      heading="Cards contain everything you need"
      subHeading="Dive into the details"
      summary="Trello cards are your portal to more organized work—where every single
    part of your task can be managed, tracked, and shared with teammates.
    Open any card to uncover an ecosystem of checklists, due dates,
    attachments, conversations, and more."
      imageSrc="/images/features-cards.svg"
      imageAlt="cards illustration"
      imageHeight={275}
      imageWidth={339}
      imageOrder="end"
    >
      <LearnMoreExpandable>
        <p>
          Spin up a Trello card with a click, then uncover everything it can
          hold. Break down bigger card tasks into steps with file attachment
          previews, reminders, checklists and comments—emoji reactions included!
          Plus, gain powerful perspective by seeing all cards by list and status
          at the board level.
        </p>
        <ul>
          <li>Manage deadlines</li>
          <li>Provide and track feedback</li>
          <li>Assign tasks and hand off work</li>
          <li>Connect work across apps</li>
        </ul>
      </LearnMoreExpandable>
    </FeatureBlock>
  );
};
