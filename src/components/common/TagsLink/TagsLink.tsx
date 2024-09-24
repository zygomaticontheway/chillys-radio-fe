
import React from 'react';
import styles from './TagsLink.module.css';

interface TagsLinkProps {
  tags: string[];
}

const TagsLink: React.FC<TagsLinkProps> = ({ tags }) => {
  return (
    <div className={styles.tags}>
      {tags.map((tag, index) => (
        <span key={index} className={styles.tag}>
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagsLink;
