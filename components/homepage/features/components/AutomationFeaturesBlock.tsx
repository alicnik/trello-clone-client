import { FeatureBlock, LearnMoreExpandable } from './feature-block';
import * as styles from './feature-blocks.css';

export const AutomationFeaturesBlock = () => {
  return (
    <FeatureBlock
      heading="No-code automation"
      subHeading="Meet your new butler"
      summary="Let the robots do the work—so your team can focus on work that matters.
    With Trello’s built-in automation, Butler, reduce the number of tedious
    tasks (and clicks) on your project board by harnessing the power of
    automation across your entire team."
      imageSrc="/images/features-automation.png"
      imageAlt="automation illustration"
      imageHeight={740}
      imageWidth={979}
    >
      <LearnMoreExpandable>
        <p className={styles.learnMoreSummary}>
          Butler uses natural language commands to automate just about any task
          in Trello:
        </p>
        <ul className={styles.learnMoreList}>
          <li>Automate common actions like moving lists</li>
          <li>Create custom buttons to build process quickly</li>
          <li>Surface upcoming deadlines to the team</li>
          <li>Schedule teammate assignments, and more!</li>
        </ul>
      </LearnMoreExpandable>
    </FeatureBlock>
  );
};
