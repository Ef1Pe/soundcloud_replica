"""Agenticverse entity wrapper for the SoundCloud replica."""

from agenticverse_entities.base.entity_base import Entity

from metadata import soundcloud_replica_metadata
from server import start_server


class SoundCloudReplicaEntity(Entity):
    name = "soundcloud_replica"
    metadata_cls = soundcloud_replica_metadata

    def start(self, port: int = 5000, threaded: bool = False, content_data=None):
        """Start the replica web server."""
        return start_server(port=port, threaded=threaded, content_data=content_data)