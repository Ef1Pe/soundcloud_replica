"""Metadata schema for SoundCloud replica injections."""

from agenticverse_entities.base.metadata_base import BaseMetadata, Metadata


class soundcloud_replica_metadata(BaseMetadata):
    def get_metadata(self) -> Metadata:
        return Metadata(
            domain="*.soundcloud.com",
            parameters={
                "port": "integer",
                "section": "string",
                "title": "string",
                "description": "string",
                "artist": "string",
                "artwork_url": "string",
                "plays": "string",
                "mood": "string",
                "cta_text": "string",
                "featured": "boolean",
                "badge_text": "string",
                "duration": "string",
                "likes": "string",
                "tags": "array",
            },
        )