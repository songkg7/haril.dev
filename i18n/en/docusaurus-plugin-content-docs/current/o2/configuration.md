---
title: Configuration
sidebar_position: 2
---

# Configuration

O2 provides various configuration options to customize its behavior. Here's a detailed guide to all available settings.

## Path Settings

### Ready Folder
- **Name**: Folder to convert notes to another syntax in
- **Default**: `ready`
- **Description**: The folder where notes that are ready to be converted will be placed.

### Archive Folder
- **Name**: Folder to Archive notes in
- **Default**: `archive`
- **Description**: The folder where notes will be archived after conversion (when auto-archive is enabled).

### Attachments Folder
- **Name**: Folder to store attachments in
- **Default**: `attachments`
- **Description**: The folder where all attachments (images, files, etc.) are stored.

## Features

### Auto Create Folders
- **Default**: Disabled
- **Description**: When enabled, O2 will automatically create necessary folders if they don't exist.

### Auto Archive
- **Default**: Disabled
- **Description**: When enabled, notes will be automatically moved to the archive folder after conversion.

### Curly Brace Conversion (Jekyll)
- **Default**: Disabled
- **Description**: When enabled, double curly braces will be converted to Jekyll raw tags.

### Update Frontmatter Time
- **Default**: Disabled
- **Description**: When enabled, if an 'updated' frontmatter exists, the 'date' frontmatter will be replaced with the 'updated' value.

## Jekyll Settings

### Jekyll Path
- **Description**: The absolute path where your Jekyll workspace is located.
- **Example**: `/Users/username/blog`

### Relative Resource Path
- **Default**: `assets/img`
- **Description**: The relative path where resources (images, attachments) are stored in your Jekyll project.

### Liquid Filter
- **Description**: Settings for Jekyll's Liquid template filters.

## Docusaurus Settings

### Docusaurus Path
- **Description**: The absolute path where your Docusaurus workspace is located.
- **Example**: `/Users/username/website`

### Date Extraction Pattern
- **Description**: The pattern used to extract dates from note titles.
- **Options**: Various patterns for different date formats.

### Authors
- **Description**: Author(s) for Docusaurus front matter.
- **Format**: For multiple authors, separate with commas (e.g., `jmarcey, slorber`)
