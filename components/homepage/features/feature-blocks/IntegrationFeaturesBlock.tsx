import { FeatureBlock, LearnMoreExpandable } from './feature-block-component';
import * as styles from './feature-blocks.css';

export const IntegrationFeaturesBlock = () => {
  return (
    <FeatureBlock
      heading="Integrate top work tools today"
      subHeading="Power-ups"
      summary="Easily connect the apps your team already uses into your Trello
    workflow, or add a Power-Up that helps fine-tune one specific need. With
    hundreds of Power-Ups available, your team’s workflow wishes are
    covered."
      imageSrc="/images/features-integrations.png"
      imageAlt="integration illustration"
      imageHeight={678}
      imageWidth={753}
      imageOrder="end"
    >
      <LearnMoreExpandable>
        <p className={styles.learnMoreSummary}>
          From Reporting to Custom Fields to your beloved software
          integrations—we’ve got functionalities, your favorites, and more!
        </p>
        <ul className={styles.learnMoreList}>
          <li>Confluence</li>
          <li>Slack</li>
          <li>Dropbox</li>
          <li>Google Drive</li>
          <li>Evernote</li>
        </ul>
      </LearnMoreExpandable>
    </FeatureBlock>
  );
};
